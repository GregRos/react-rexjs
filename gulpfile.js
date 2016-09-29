/**
 * Created by Greg on 25/09/2016.
 */
var gulp = require('gulp'),
	argv = require('yargs').argv, // for args parsing
	spawn = require('child_process').spawn;
var ts = require('gulp-typescript');
var merge = require('merge2');
var tsFiles = ['typings/*.*', 'src/**/*.tsx', 'src/**/*.ts', '!typings/*/*.*'];
var watchToo = ['tsconfig.json'];
var tsProject = ts.createProject('tsconfig.json', {'sourceMap' : true, 'declaration' : true});
var sourcemaps = require('gulp-sourcemaps');
gulp.task('compile-ts', () => {

	var tsResult =
		gulp.src(tsFiles)
		.pipe(sourcemaps.init())
		.pipe(tsProject());

	return merge([
		tsResult.dts.pipe(gulp.dest('dist')),
		tsResult.js.pipe(sourcemaps.write('.', {sourceRoot: '/src'})).pipe(gulp.dest('dist'))
	]);
});

gulp.task('watch', ['compile-ts'], () => {
	gulp.watch(tsFiles.concat(watchToo), ['compile-ts'])
});

gulp.task('auto-reload', function() {
	var p;

	gulp.watch('gulpfile.js', spawnChildren);
	spawnChildren();

	function spawnChildren(e) {
		// kill previous spawned process
		if(p) { p.kill(); }

		// `spawn` a child `gulp` process linked to the parent `stdio`
		p = spawn('gulp', [argv.task], {stdio: 'inherit'});
	}
});