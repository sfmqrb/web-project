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
	//todo send image
	Image string `json:"image"`
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
	Username string `json:"username"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	//todo
	ImagePath string `json:"imagePath"`
	Bio       string `json:"bio"`
}
