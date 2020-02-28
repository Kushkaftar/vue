package send

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

func ConvStruct (g GetCount){
	//fmt.Println(g)
	//fmt.Println(len(g.Country))
	//qqq := g.Country
	//fmt.Printf("%T\n", qqq)
	f := Form{}
	f.Hash = g.Hash
	f.Token = g.Token
	f.Name = USERNAME
	f.UserAgent = USERAGENT
	f.IP = "66.249.73.202"


	Model := make(map[string]string)
	Model["RU"] = "7910numb7"
	Model["KZ"] = "77numb9"
	Model["BY"] = "37533numb7"
	Model["UA"] = "380numb9"
	Model["KG"] = "996numb9,10"
	Model["GE"] = "995numb8,10"
	Model["AZ"] = "994numb9,10"
	Model["AM"] = "374numb8,9"
	//fmt.Println(Model["KG"])
	//send (g.Token)
	for j := 0; j < g.QuantityLeads; j++ {
		for _, v := range g.Country {
			model := Model[v.Geo]
			f.Phone = phoneRandom(model)
			f.CountryCall = v.Geo
			fmt.Println(f)
			//send(f)
		}
	}
	//test := RandomReturn(7,10)
	//fmt.Println(test)
	//fmt.Printf("%T\n", RandomReturn(1,10))
}



func RandomReturn (n, m int) string {
	var randnumq string
	for j := 0; j < n; j++ {
		randnum := strconv.Itoa(rand.Intn(m))
		randnumq = randnumq + randnum
	}
	return  randnumq
}

func phoneRandom (model string) string {
	args := strings.Split(model, "numb")
	mask := args[0]
	if len(args[1])>1 {
		argsNumb := strings.Split(args[1], ",")
		argsNumb1, _ := strconv.Atoi(argsNumb[0])
		argsNumb2, _ := strconv.Atoi(argsNumb[1])
		n, _ := strconv.Atoi(RandomReturn(1, argsNumb2-argsNumb1))
		phone := mask + RandomReturn(argsNumb1+n, 10)
		fmt.Println(phone)
		return phone
	}else {
		argsNumb1, _ := strconv.Atoi(args[1])
		phone := mask + RandomReturn(argsNumb1, 10)
		fmt.Println(phone)
		return phone
	}


}

func send (f Form){


	//ft := Form{}
	//
	//ft.Hash = "8500e877-bff2-4e6e-8363-8a3f0c3cabf6"
	//ft.Name = "test"
	//ft.Phone = "89100000000"
	//ft.IP = "66.249.73.202"
	//ft.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"


	urlWebmaster := "https://lucky.online/api-webmaster/lead.html?api_key=" + f.Token


	formData := url.Values{
		"name": {f.Name},
		"phone": {f.Phone},
		"ip": {f.IP},
		"userAgent": {f.UserAgent},
		"campaignHash": {f.Hash},
		"country_call": {f.CountryCall},
	}
	fmt.Println(formData)

	resp, err := http.PostForm(urlWebmaster, formData)
	if err != nil {
		log.Fatalln(err)
	}

	var result map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&result)

	log.Println(result["form"])
	fmt.Println(result)

}