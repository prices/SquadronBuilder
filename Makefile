JSFILES = src/code/squadronbuilder.js \
	src/data/weapons.js src/data/mecha.js \
	src/force/core.js src/force/characters.js src/force/special.js src/force/support.js src/force/upgrades.js


all: rel/js/squadronbuilder.min.js rel/index.html rel/css/default.css

contrib: rel/contrib/svg.min.js rel/contrib/simplegrid.css


rel/js/squadronbuilder.js: rel/js $(JSFILES) src/head.js src/tail.js
	cat src/head.js > rel/js/squadronbuilder.js;
	@for file in $(JSFILES); do \
	    echo "cat $$file >> rel/js/squadronbuilder.js"; \
	    cat $$file >> rel/js/squadronbuilder.js; \
	done
	cat src/tail.js >> rel/js/squadronbuilder.js;

rel/js/squadronbuilder.min.js: rel/js/squadronbuilder.js
	uglifyjs -o rel/js/squadronbuilder.min.js rel/js/squadronbuilder.js

rel/index.html: rel src/index.html
	cp src/index.html rel/index.html

rel/css/default.css: rel/css src/css/default.css
	cp src/css/default.css rel/css/default.css

rel/contrib/svg.min.js: rel/contrib
	wget https://raw.github.com/wout/svg.js/master/dist/svg.min.js -O rel/contrib/svg.min.js
	wget https://raw.github.com/wout/svg.js/master/README.md -O rel/contrib/svg.js.README.md
	wget https://raw.github.com/wout/svg.js/master/MIT-LICENSE -O rel/contrib/svg.js.LICENSE
	wget https://github.com/wout/svg.export.js/raw/master/svg.export.js -O rel/contrib/svg.export.js

rel/contrib/simplegrid.css: rel/contrib
	wget https://github.com/ThisIsDallas/Simple-Grid/raw/master/simplegrid.css -O rel/contrib/simplegrid.css
	wget https://github.com/ThisIsDallas/Simple-Grid/raw/master/README.md -O rel/contrib/simplegrid.README.md
	
rel:
	mkdir -p rel
	
rel/contrib: rel
	mkdir -p rel/contrib

rel/js: rel
	mkdir -p rel/js

rel/css: rel
	mkdir -p rel/css

clean:
	rm -f rel/*.js rel/*.html
	