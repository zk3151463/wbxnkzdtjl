package controller

import (
	"fmt"

	"github.com/energye/energy/v2/cef"
	"github.com/energye/energy/v2/cef/ipc"
	"github.com/energye/energy/v2/cef/ipc/context"
)

// 初始化函数，用于注册路由
func Init(event *cef.BrowserEvent, window cef.IBrowserWindow) {
	// Register your routes here
	Setting(event, window)
}

// 设置函数，用于处理事件
func Setting(event *cef.BrowserEvent, window cef.IBrowserWindow) {

	// 注册一个名为"go-on-event-demo"的事件
	ipc.On("go-on-event-demo", func(context context.IContext) {
		fmt.Println("go-on-event-demo event run")

		//js 中传递的数据
		//虽然 Arguments 结构支持多个数据类型，但在js和go的对应中，只保留了 string, integer, double, boolean 的对应关系，其它类型在 go 和 js数据传递时不支持
		arguments := context.ArgumentList()
		fmt.Println("参数个数:", arguments.Size())
		//参数是以js调用时传递的参数下标位置开始计算，从0开始表示第1个参数
		name := arguments.GetStringByIndex(0)
		fmt.Println("参数1:", name)
	})

}
