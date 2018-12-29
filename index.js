function fix_width(){
	let width = $('.robot').height();
	$('.robot').width(width);
	$('.box').width(width);
	$('.elevator-shaft-one').width(width);
	$('.elevator-shaft-two').width(width);
}
function show_DS(){
	let timeline = anime.timeline();
	let cur_loc = $('#push_arm')[0].getBoundingClientRect();
	let tar_loc = $('.elevator-shaft-two')[0].getBoundingClientRect();
	let box_loc = $('#box-two')[0].getBoundingClientRect();
	timeline.add({
		targets: '#robot-one',
		translateX: function(){
			return box_loc.left - cur_loc.right;
		},
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#robot-one',
		translateX: function(){
			return tar_loc.left - cur_loc.right;
		},
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#box-two',
		translateX: function(){
			return tar_loc.left - box_loc.left;
		},
		offset: "-=1000",
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#box-two',
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},
		translateX: function(){
			return tar_loc.left - box_loc.left;
		},
		easing: 'linear',
		duration: 1000,
	}).add({
		targets: ".elevator-two",
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},
		offset: '-=1000',
		easing: 'linear',
		duration: 1000,
	});
}
function show_ALG(){
}
function init(){
	fix_width();
	$('#box-one').click(show_ALG);
	$('#box-two').click(show_DS);
}
$(document).ready(init,false);