JSFILES = src/code/squadronbuilder.js \
	src/data/weapons.js src/data/mecha.js


all: rel/squadronbuilder.min.js rel/index.html rel/force.svg rel/contrib/svg.min.js


rel/squadronbuilder.js: rel $(JSFILES) src/head.js src/tail.js
	cat src/head.js > rel/squadronbuilder.js;
	@for file in $(JSFILES); do \
	    echo "cat $$file >> rel/squadronbuilder.js"; \
	    cat $$file >> rel/squadronbuilder.js; \
	done
	cat src/tail.js >> rel/squadronbuilder.js;

rel/squadronbuilder.min.js: rel/squadronbuilder.js
	uglifyjs -o rel/squadronbuilder.min.js rel/squadronbuilder.js

rel/index.html: rel src/index.html
	cp src/index.html rel/index.html

rel/force.svg: rel src/force.svg
	cp src/force.svg rel/force.svg

rel/contrib/svg.min.js: rel/contrib
	wget https://raw.github.com/wout/svg.js/master/dist/svg.min.js -O rel/contrib/svg.min.js
	
rel:
	mkdir -p rel
	
rel/contrib: rel
	mkdir -p rel/contrib
	
clean:
	rm -f rel/*.js rel/*.html
	