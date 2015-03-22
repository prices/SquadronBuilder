JSFILES = src/code/squadronbuilder.js \
	src/data/weapons.js src/data/mecha.js \
	src/force/core.js src/force/characters.js src/force/special.js src/force/support.js src/force/upgrades.js


all: html/js/squadronbuilder.min.js html/index.html html/css/default.css html/README.md html/LICENSE

contrib: html/contrib/svg.min.js html/contrib/simplegrid.css


html/js/squadronbuilder.js: html/js $(JSFILES) src/head.js src/tail.js
	cat src/head.js > html/js/squadronbuilder.js;
	@for file in $(JSFILES); do \
	    echo "cat $$file >> html/js/squadronbuilder.js"; \
	    cat $$file >> html/js/squadronbuilder.js; \
	done
	cat src/tail.js >> html/js/squadronbuilder.js;

html/js/squadronbuilder.min.js: html/js/squadronbuilder.js
	uglifyjs -o html/js/squadronbuilder.min.js html/js/squadronbuilder.js

html/index.html: html src/index.html
	cp src/index.html html/index.html

html/css/default.css: html/css src/css/default.css
	cp src/css/default.css html/css/default.css

html/contrib/svg.min.js: html/contrib
	wget https://raw.github.com/wout/svg.js/master/dist/svg.min.js -O html/contrib/svg.min.js
	wget https://raw.github.com/wout/svg.js/master/README.md -O html/contrib/svg.js.README.md
	wget https://raw.github.com/wout/svg.js/master/MIT-LICENSE -O html/contrib/svg.js.LICENSE
	wget https://github.com/wout/svg.export.js/raw/master/svg.export.js -O html/contrib/svg.export.js

html/contrib/simplegrid.css: html/contrib
	wget https://github.com/ThisIsDallas/Simple-Grid/raw/master/simplegrid.css -O html/contrib/simplegrid.css
	wget https://github.com/ThisIsDallas/Simple-Grid/raw/master/README.md -O html/contrib/simplegrid.README.md
	
html:
	mkdir -p html
	
html/contrib: html
	mkdir -p html/contrib

html/js: html
	mkdir -p html/js

html/css: html
	mkdir -p html/css

html/README.md: README.md
	cp README.md html/README.md

html/LICENSE: LICENSE
	cp LICENSE html/LICENSE

clean:
	rm -f html/*.js html/*.html
	