package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

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

func getNews(db *sql.DB) gin.HandlerFunc {
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

			if err := rows.Scan(&item.ID, &item.Title, &item.Details, &item.Image, &item.Url, &item.Likes); err != nil {
				c.String(http.StatusInternalServerError,
					fmt.Sprintf("Error scanning news: %q", err))
				return
			}
			items = append(items, item)
		}
		c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": items})
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

	router := gin.New()
	router.Use(gin.Logger())
	router.LoadHTMLGlob("templates/*.tmpl.html")
	router.Static("/static", "static")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl.html", nil)
	})

	router.GET("/api", getNews(db))

	router.Run(":" + port)
}
