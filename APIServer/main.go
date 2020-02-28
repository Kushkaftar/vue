package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"APIServer/send"
)






func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api", GetApi).Methods("POST")
	r.Headers("X-Requested-With", "XMLHttpRequest")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://127.0.0.1:5500"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	fmt.Println("Server is listening...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}


func GetApi (w http.ResponseWriter, r *http.Request) {
	g := send.GetCount{}

	err := json.NewDecoder(r.Body).Decode(&g)
	log.Println(err)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error":"`+err.Error()+`"`))
		return
	}
	fmt.Println(g)
	fmt.Printf("%T\n", g.Country)
	send.ConvStruct(g)



	re1 := send.AnswerLucky{}
	re2 := send.AnswerLucky{}
	re3 := send.AnswerLucky{}

	re1.Success = true
	re1.Data.ClickID = 1925254567
	re1.Data.Country = "GE"
	re1.Data.IsDesktop = true

	re2.Success = true
	re2.Data.ClickID = 1925255577
	re2.Data.Country = "RU"
	re2.Data.IsDesktop = false

	re3.Success = true
	re3.Data.ClickID = 2921285577
	re3.Data.Country = "UA"
	re3.Data.IsDesktop = true


	re := []send.AnswerLucky{}
	re = append(re, re1)
	re = append(re, re2)
	re = append(re, re3)

	fmt.Println(re)

	payload, err := json.Marshal(&re)
		if err != nil {
			log.Println(err)
		}

	w.Header().Set("Content-Type", "application/json")

	w.Write(payload)
}