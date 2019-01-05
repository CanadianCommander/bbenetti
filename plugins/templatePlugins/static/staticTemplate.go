package main

import (
	"html/template"
	"path"
	"strings"

	"github.com/CanadianCommander/MicroWeb/pkg/logger"
	mwsettings "github.com/CanadianCommander/MicroWeb/pkg/mwSettings"
	"github.com/CanadianCommander/MicroWeb/pkg/pluginUtil"
	"github.com/CanadianCommander/MicroWeb/pkg/templateHelper"
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

	//parse template
	myTemplate := template.New("root")
	templateHelper.AddTemplateGroup(myTemplate, "main")

	_, err := myTemplate.Parse(string(*rawContent))
	if err != nil {
		logger.LogError("Could not parse template file: %s with error: %s", staticFilePath, err.Error())
		return nil
	}

	out := strings.Builder{}
	myTemplate.Execute(&out, nil)

	myData.Content = template.HTML(out.String())
	return &myData
}
