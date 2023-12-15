function PopUp() {
	Swal.fire({
		title: '<p class="coregrad-string" style="font-weight: 600;font-size: 2rem;">Thanks for choosing Core!</p>',
		html: ' <p>A Batch script file has been downloaded, please run it to install. <br><br>If Windows or your browser blocks it, click run anyway (you may also need to click "more info" to see the option). It gets blocked just because the file isn\'t known.<br><br>If you have any problems you can join our Discord server. </p>',
		icon: 'success',
		// imageUrl: '../img/core.png',
		// imageWidth: 128,
		// imageHeight: 128,
		background: '#181a1b',
		showDenyButton: true,
		confirmButtonColor: '#5865F2',
		confirmButtonText: 'Join our Discord',
		denyButtonColor: '#232323',
		denyButtonText: 'Other methods',
	}).then((result) => {
		if (result.isConfirmed) {
			window.open('https://github.com/odest', '_blank')
			Swal.close()
		} else if (result.isDenied) {
			window.open('https://github.com/odest', '_blank')
			Swal.close()
		}
	})
}

function downloadLatestCore() {
	let dnld = () =>
		window.location.href = "https://github.com/odest/odest.github.io/blob/master/docs/readme.txt"
	if (navigator.userAgent.indexOf('Win') != -1) {
		dnld()
		PopUp()
	} else {
		Swal.fire({
			title: '<p style="color: #facea8">Incompatible Device</p>',
			html: 'iClock is intended for Windows devices. Download anyway?',
			icon: 'warning',
			imageWidth: 128,
			imageHeight: 128,
			background: '#181a1b',
			showDenyButton: true,
			confirmButtonText: 'Download',
			denyButtonText: 'Cancel',
		}).then((result) => {
			if (result.isConfirmed) {
				dnld()
				Swal.close()
			}
		})
	}
}

function openNav() {
	document.getElementById("myNav").style.height = "100%";
	document.getElementById("navbar-container").style.opacity = "0";
}

function closeNav() {
	document.getElementById("myNav").style.height = "0%";
	document.getElementById("navbar-container").style.opacity = "1";
}


function changeAbtModuleTo(name, next) {
	if (document.getElementsByClassName('module-array-img-selected').length != 0) {
		document.getElementsByClassName('module-array-img-selected')[0].classList.remove('module-array-img-selected');
	}
	next.classList.add('module-array-img-selected');
	
	const whole = document.getElementById('modules-interactive-info');
	const title = document.getElementById('about-module-info-header');
	const des = document.getElementById('about-module-info-description');
	const img = document.getElementById('about-module-info-img');

	whole.classList.add('toLeft')
	
	setTimeout(() => {
		title.innerHTML = name;
		des.innerHTML = module_list[name];
		img.src = "img/Module/Card/"+name+".png";
		whole.classList.remove('toLeft')
	}, 300);
	
}

function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback(visible);
            }
        }
    }
}
/* -------------------------------------------------------------------------- */
/*                                   On load                                  */
/* -------------------------------------------------------------------------- */

window.onload = function() {
	var i = 0;
	for (const name in module_list) {
		var array_index = (i >= 5 ? 2 : 1);
		document.getElementById('array-'+array_index).insertAdjacentHTML('beforeend', `
		<img src="img/Module/Icon/`+name+`.png" class="module-array-img" onclick="changeAbtModuleTo('`+name+`', this)"></img>
		`)
		i++;
	}
	const first = document.getElementById('array-1').firstElementChild;

	changeAbtModuleTo(Object.keys(module_list)[0], first);
}

const handler = onVisibilityChange(document.getElementById('dlbutton'), function(bool) {
    if (bool) {
		navdlbutton.classList.add('not-active')
	} else {
		navdlbutton.classList.remove('not-active')
	}
});

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('body-container-visible');
		} else {
			entry.target.classList.remove('body-container-visible');
		}
	});
});

const navdlbutton = document.getElementById('nav-dlbutton');
const sections = document.querySelectorAll('.body-container');

sections.forEach((el) => observer.observe(el));

if (window.addEventListener) {
    addEventListener('DOMContentLoaded', handler, false);
    addEventListener('load', handler, false);
    addEventListener('scroll', handler, false);
    addEventListener('resize', handler, false);
} else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
    attachEvent('onload', handler);
    attachEvent('onscroll', handler);
    attachEvent('onresize', handler);
}

