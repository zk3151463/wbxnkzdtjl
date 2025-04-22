package main

import (
	"embed"

	"github.com/energye/energy/v2/cef"
	"github.com/energye/energy/v2/cef/ipc"
	"github.com/energye/golcl/lcl"
	"github.com/energye/golcl/lcl/rtl/version"
	"github.com/energye/golcl/pkgs/macapp"
)

//go:embed resources
var resources embed.FS

func main() {
	lcl.DEBUG = true
	macapp.MacApp.SetEnergyEnv("dev")
	//Global initialization must be called
	cef.GlobalInit(nil, &resources)
	//Create an application
	app := cef.NewApplication()
	app.SetUseMockKeyChain(true)
	cef.BrowserWindow.Config.Width = 1086
	cef.BrowserWindow.Config.MinWidth = 1086
	cef.BrowserWindow.Config.MinHeight = 656
	cef.BrowserWindow.Config.Height = 656

	//Local load resources
	cef.BrowserWindow.Config.LocalResource(cef.LocalLoadConfig{
		ResRootDir: "resources",
		FS:         &resources,
	}.Build())
	// run main process and main thread
	cef.BrowserWindow.SetBrowserInit(browserInit)
	//run app
	cef.Run(app)
}

// run main process and main thread
func browserInit(event *cef.BrowserEvent, window cef.IBrowserWindow) {
	// index.html ipc.emit("count", [count++])
	ipc.On("count", func(value int) {
		println("count", value)
	})
	// page load end
	event.SetOnLoadEnd(func(sender lcl.IObject, browser *cef.ICefBrowser, frame *cef.ICefFrame, httpStatusCode int32, window cef.IBrowserWindow) {
		// index.html, ipc.on("osInfo", function(){...})
		println("osInfo", version.OSVersion.ToString())
		ipc.Emit("osInfo", version.OSVersion.ToString())
		var windowType string
		if window.IsLCL() {
			windowType = "LCL"
		} else {
			windowType = "VF"
		}
		// index.html, ipc.on("windowType", function(){...});
		ipc.Emit("windowType", windowType)
	})
}
