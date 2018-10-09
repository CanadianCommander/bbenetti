package main

import (
	"net/http"
	"path"
	"strings"

	"github.com/CanadianCommander/MicroWeb/pkg/logger"
	mwsettings "github.com/CanadianCommander/MicroWeb/pkg/mwSettings"
	pu "github.com/CanadianCommander/MicroWeb/pkg/pluginUtil"
)

func HandleRequest(req *http.Request, res http.ResponseWriter, fsName string) bool {
	cvParse := cvParseStruct{}

	err := pu.ProcessTemplateText(pu.ReadFileToBuff(fsName), res, &cvParse)
	if err != nil {
		logger.LogError("Error Processing template: %s", err.Error())
		return false
	}

	return true
}

type cvParseStruct struct {
}

func (cv *cvParseStruct) GetSectionContent(name string) string {
	name = strings.Trim(name, " ")
	buff := pu.ReadFileToBuff(ResolveSectionName(name))
	if buff == nil {
		logger.LogError("Could not load section file with name: %s", name)
		return "500 internal error"
	}

	return string((*buff)[:])
}

func ResolveSectionName(name string) string {
	staticDir := mwsettings.GlobalSettings.GetStaticResourcePath()
	return path.Join(staticDir, "sections", name)
}
