package queryHandeler

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type LoginResponse struct {
	NoUsername bool   `json:"noUsername"`
	WrongPass  bool   `json:"wrongPass"`
	Jwt        string `json:"jwt"`
	Username   string `json:"username"`
	Name       string `json:"name"`
	Bio        string `json:"bio"`
	Image      string `json:"image"`
}

type RegisterRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Email    string `json:"email"`
}

type CreateUserResponse struct {
	//same as login response
}

type FillProfileRequest struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	ImagePath string `json:"imagePath"`
	Bio       string `json:"bio"`
}
type SearchRecipeRequest struct {
	IngsIn    []string `json:"ingsIn"`
	IngsOut   []string `json:"ingsOut"`
	TagsIn    []string `json:"tagsIn"`
	TagsOut   []string `json:"tagsOut"`
	OrderBy   string   `json:"orderBy"`
	Ascending bool     `json:"ascending"`
}
