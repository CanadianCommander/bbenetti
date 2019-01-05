package main

import (
	"encoding/json"
	"html/template"
	"path"

	"github.com/CanadianCommander/MicroWeb/pkg/logger"
	mwsettings "github.com/CanadianCommander/MicroWeb/pkg/mwSettings"
	"github.com/CanadianCommander/MicroWeb/pkg/pluginUtil"
)

// ConfigurationData represents the configuration data entered in to the JSON config file.
type ConfigurationData struct {
	Css      []string
	Sections []struct {
		Header,
		HeaderClass,
		ItemClass string
		Items []struct {
			Id int
			Name,
			Desc template.HTML
		}
	}
}

func GetTemplate(template *template.Template) {
	templatePath := path.Join(mwsettings.GetSettingString("general/staticDirectory"), "sections/techMap/techMap.gohtml")
	rawTemplate := pluginUtil.ReadFileToBuff(templatePath)
	if rawTemplate == nil {
		logger.LogError("Could not read template file: %s", templatePath)
		return
	}

	_, err := template.Parse(string(*rawTemplate))
	if err != nil {
		logger.LogError("Could not parse template from file %s [techMap]", templatePath)
	}
}

func GetData(argv interface{}) interface{} {
	configFilePath, bOk := argv.(string)
	if !bOk {
		logger.LogError("expected string argument to techMap.GetData(argv). Argument should be config file path!")
		return nil
	}
	configFilePath = path.Join(mwsettings.GetSettingString("general/staticDirectory"), configFilePath)
	rawConfigData := pluginUtil.ReadFileToBuff(configFilePath)
	if rawConfigData == nil {
		logger.LogError("Could not load TechMap configuration file: %s", configFilePath)
		return nil
	}

	confData := ConfigurationData{}
	err := json.Unmarshal(*rawConfigData, &confData)
	if err != nil {
		logger.LogError("Could not parse config file: %s with error: %s", configFilePath, err.Error())
		return nil
	}

	// generate a simple incrementing id for each item. This will later be used to relate
	// items to their descriptions in the JS code.
	id := 0
	for _, sec := range confData.Sections {
		for i, _ := range sec.Items {
			sec.Items[i].Id = id
			id += 1
		}
	}

	return &confData
}
