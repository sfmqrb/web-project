package image

import (
	"github.com/google/uuid"
	"io/ioutil"
	"strings"
)

type UploadResponse struct {
	FileName string `json:"fileName"`
}

const defaultImageDirPath = "back/images"

func HandleUploadImage(fileByte []byte, fileName string) string {
	uniqueId := uuid.New()
	fileNameList := strings.Split(fileName, ".")
	name := uniqueId.String() + "." + fileNameList[len(fileNameList)-1]
	saveName := defaultImageDirPath + "/" + name
	err := ioutil.WriteFile(saveName, fileByte, 0644)
	if err != nil {
		return ""
	}
	return name
}
func HandleDownloadImage(fileName string) []byte {
	fileBytes, err := ioutil.ReadFile(defaultImageDirPath + "/" + fileName)
	if err != nil {
		return nil
	}
	return fileBytes
}
