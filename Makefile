deploy:
	gulp build --prod
	scp -r ./dist/* clap:/var/www/xn--mn8hhf.ws
