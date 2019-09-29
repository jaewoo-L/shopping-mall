var path = require("path")

module.exports = { 
	outputDir : path.resolve(__dirname, "../backend/public/"),
	devServer: 
	{ proxy: 
		{ // proxyTable 설정  이는 frontend 개발중 http://localhost:8080/api에 대한 요청이 왔을때 http://localhost:3000/api로 프록시 하게된다.
			'/api': { 
				target: 'http://localhost:3000/api', 
				changeOrigin: true , 
				pathRewrite:{ 
					"^/api" : '' 
				} 
			},
			'/exercise': {
				target: 'http://localhost:3000/exercise', 
				changeOrigin: true , 
				pathRewrite:{ 
					"^/exercise" : '' 
				} 
			} 
		} 
	} 
}

