package main

import (
	"html/template"
	"path"

	"github.com/CanadianCommander/MicroWeb/pkg/logger"
	mwsettings "github.com/CanadianCommander/MicroWeb/pkg/mwSettings"
	"github.com/CanadianCommander/MicroWeb/pkg/pluginUtil"
)

func GetTemplate(template *template.Template) {
	myTemplate := "{{.Content}}"

	_, err := template.Parse(myTemplate)
	if err != nil {
		logger.LogError("Could not parse template [staticTemplate]")
	}
}

func GetData(argv interface{}) interface{} {
	staticAssetName, bOk := argv.(string)
	if !bOk {
		logger.LogError("expected string in call to staticTemplate.GetData(argv)")
		return nil
	}

	type data struct {
		Content template.HTML
	}

	myData := data{}
	staticFilePath := path.Join(mwsettings.GetSettingString("general/staticDirectory"), staticAssetName)
	rawContent := pluginUtil.ReadFileToBuff(staticFilePath)
	if rawContent == nil {
		logger.LogError("Could not read requrested static file with path: %s", staticFilePath)
		return nil
	}

	myData.Content = template.HTML((*rawContent))
	return &myData
}
