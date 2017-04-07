var gulp = require('gulp');
var fs = require('fs');

var sass = require('gulp-sass');
var shell = require('gulp-shell');
var consolidate = require('gulp-consolidate');

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['sass']);

gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass:doc', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./docs/dist/css/'));
});

function dataDirectory(directory, dataPath, done) {
  var data = fs.createWriteStream(dataPath);

	fs.readdir(directory, function(err, files) {
		files.forEach(function(file) {
			if (file[0] === '.') {
				return;
			}

			data.write('- ' + file + "\n");
		});

		data.end();

		if (typeof done === 'function') {
			done();
		}
	});
}

gulp.task('sass:watch', ['build'], function () {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('dev', ['sass', 'sass:watch', 'server']);

gulp.task('server', shell.task([
  'bundle exec jekyll serve'
]));
