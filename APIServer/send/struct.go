package send

const USERNAME string = "LUCKY_AUTO_TEST"
const USERAGENT string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"

type ReqCount struct {
	Token string `json:"token"`
	Hash string `json:"hash"`
	QuantityLeads int `json:"quantity_leads"`
	Country [] Country `json:"country"`
}


type Country struct {
	Geo string `json:"geo"`
}
type GetCount struct {
	Token string `json:"token"`
	Hash string `json:"hash"`
	QuantityLeads int `json:"quantity_leads"`
	Country []Country `json:"country"`
}

type GetCountVue struct {
	Token string `json:"token"`
	Hash string `json:"hash"`
	QuantityLeads string `json:"quantity_leads"`
	Country []Country `json:"country"`
}

type Form struct {
	Token string
	Hash string
	Name string
	Phone string
	IP string
	UserAgent string
	CountryCall string
}
type AnswerLuckyArr struct {
	AnswerLucky []AnswerLucky `json:"leads"`
}

type AnswerLucky struct {
	Success bool `json:"success"`
	Data    Data `json:"data"`
}
type Data struct {
	ClickID   int    `json:"click_id"`
	Country   string `json:"country"`
	IsDesktop bool   `json:"is_desktop"`
}