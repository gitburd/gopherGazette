package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
	_ "github.com/lib/pq"
)

type Item struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Details string `json:"details"`
	Image   string `json:"image"`
	Url     string `json:"url"`
	Likes   int    `json:"likes"`
}

func dbFunc(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		if _, err := db.Exec("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)"); err != nil {
			c.String(http.StatusInternalServerError,
				fmt.Sprintf("Error creating database table: %q", err))
			return
		}

		if _, err := db.Exec("INSERT INTO ticks VALUES (now())"); err != nil {
			c.String(http.StatusInternalServerError,
				fmt.Sprintf("Error incrementing tick: %q", err))
			return
		}

		rows, err := db.Query("SELECT tick FROM ticks")
		if err != nil {
			c.String(http.StatusInternalServerError,
				fmt.Sprintf("Error reading ticks: %q", err))
			return
		}

		defer rows.Close()
		for rows.Next() {
			var tick time.Time
			if err := rows.Scan(&tick); err != nil {
				c.String(http.StatusInternalServerError,
					fmt.Sprintf("Error scanning ticks: %q", err))
				return
			}
			c.String(http.StatusOK, fmt.Sprintf("Read from DB: %s\n", tick.String()))
		}
	}
}

func newsFunc(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var items []Item

		rows, err := db.Query("SELECT * FROM news")
		if err != nil {
			c.String(http.StatusInternalServerError,
				fmt.Sprintf("Error reading news: %q", err))
			return
		}

		defer rows.Close()
		for rows.Next() {
			var item Item
			// var id int
			// var title string
			// var details string
			// var url string
			// var image string
			// var likes int

			if err := rows.Scan(&item.ID, &item.Title, &item.Details, &item.Url, &item.Image, &item.Likes); err != nil {
				c.String(http.StatusInternalServerError,
					fmt.Sprintf("Error scanning news: %q", err))
				return
			}
			items = append(items, item)
			c.String(http.StatusOK, fmt.Sprintf("Read from DB: %v : %s - %s %s %s %v\n", item.ID, item.Title, item.Details, item.Url, item.Image, item.Likes))
		}
		fmt.Println(items)
	}
}

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error opening database: %q", err)
	}

	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.LoadHTMLGlob("templates/*.tmpl.html")
	router.Static("/static", "static")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl.html", nil)
	})
	router.GET("/db", dbFunc(db))
	router.GET("/news", newsFunc(db))

	router.Run(":" + port)
}
