package main

import (
	"html/template"
	"path"

	"github.com/CanadianCommander/MicroWeb/pkg/logger"
	mwsettings "github.com/CanadianCommander/MicroWeb/pkg/mwSettings"
	"github.com/CanadianCommander/MicroWeb/pkg/pluginUtil"
)

func GetTemplate(template *template.Template) {
	staticFilePath := path.Join(mwsettings.GetSettingString("general/staticDirectory"), "sections/animation.gohtml")
	rawContent := pluginUtil.ReadFileToBuff(staticFilePath)
	if rawContent == nil {
		logger.LogError("Could not read requrested static file with path: %s", staticFilePath)
		return
	}

	_, err := template.Parse(string(*rawContent))
	if err != nil {
		logger.LogError("Could not parse template [staticTemplate]")
	}
}

func GetData(argv interface{}) interface{} {
	animationName, bOk := argv.(string)
	if !bOk {
		logger.LogError("expected string in call to animationTemplate.GetData(argv)")
		return nil
	}

	type data struct {
		AnimationName string
	}
	return &data{animationName}
}
