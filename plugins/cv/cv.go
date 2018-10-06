package main

import (
	"net/http"

	"github.com/CanadianCommander/MicroWeb/pkg/logger"
	"github.com/CanadianCommander/MicroWeb/pkg/pluginUtil"
)

type cvParseStruct struct {
}

func (cv *cvParseStruct) GetSectionContent(name string) string {
	return "foobar"
}

func HandleRequest(req *http.Request, res http.ResponseWriter, fsName string) bool {
	cvParse := cvParseStruct{}

	err := pluginUtil.ProcessTemplate(pluginUtil.ReadFileToBuff(fsName), res, &cvParse)
	if err != nil {
		logger.LogError("Error Processing template: %s", err.Error())
		return false
	}

	return true
}
