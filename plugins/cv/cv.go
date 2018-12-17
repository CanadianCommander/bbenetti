package main

import (
	"html/template"
	"net/http"

	"github.com/CanadianCommander/MicroWeb/pkg/logger"
	pu "github.com/CanadianCommander/MicroWeb/pkg/pluginUtil"
	"github.com/CanadianCommander/MicroWeb/pkg/templateHelper"
)

func HandleRequest(req *http.Request, res http.ResponseWriter, fsName string) bool {

	myTemplate := template.New("root")
	templateHelper.AddTemplate(myTemplate, "staticTemplate")
	templateHelper.AddTemplate(myTemplate, "animation")

	rawTemplate := pu.ReadFileToBuff(fsName)
	if rawTemplate == nil {
		logger.LogError("Cannot read resource file, with path: %s", fsName)
		return false
	}

	_, err := myTemplate.Parse(string((*rawTemplate)))
	if err != nil {
		logger.LogError("Could not parse template: %s with error: %s", fsName, err.Error())
		return false
	}

	err = myTemplate.Execute(res, nil)
	if err != nil {
		logger.LogError("Could not execute template: %s with error: %s", fsName, err.Error())
		return false
	}

	return true
}

/*
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
	staticDir := mwsettings.GetSettingString("general/staticDirectory")
	return path.Join(staticDir, "sections", name)
}
*/
