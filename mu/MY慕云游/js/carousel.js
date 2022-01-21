// 轮播图特效

(function () {
    var carousel_list = document.getElementById('carousel-list');
    var left_btn = document.getElementById('left-btn');
    var right_btn = document.getElementById('right-btn');
    var circles_btn = document.getElementById('circles');
    var circles_list = circles_btn.getElementsByTagName('li')
    var banner = document.getElementById('banner');
    // 克隆第一张li
    var clone_li = carousel_list.firstElementChild.cloneNode(true);
    // 上述
    carousel_list.appendChild(clone_li);

    // 当前正在显示的图片序号，从0开始
    var idx = 0;

    // 节流锁
    var lock = true;

    right_btn.onclick = right_btn_handler;

    // 右按钮的事件处理函数
    function right_btn_handler() {
        // 判断节流锁的状态，如果是关闭的，那么就什么都不做
        if (!lock) return;

        // 关锁
        lock = false;
        加上过渡
        carousel_list.style.transition = 'transform .5s ease 0s';
        idx++;
        carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
        if (idx > 4) {
            setTimeout(function () {
                // 去掉过渡
                carousel_list.style.transition = 'none';
                // 删除transform属性
                carousel_list.style.transform = 'none';
                // 全局图片变为0
                idx = 0;
            },500);
        }
        // 调用
        setCircles();
        // 动画结束之后开锁
        setTimeout(function () { 
            lock = true;
        },500)
    };

    left_btn.onclick = function () {
        if (!lock) return;
        // 关锁
        lock = false;
        // 左按钮很特殊，要先写if语句，而不是index
        if (idx === 0) {
            // 瞬间拉动到最后,去掉过渡
            carousel_list.style.transition = 'none'
            // 拉到最后
            carousel_list.style.transform = 'translateX(' + -16.66 * 5 + '%)'
            // 改变index的值
            idx = 4;
            setTimeout(function () {
                carousel_list.style.transition = 'transform .5s ease 0s';
                carousel_list.style.transform = 'translateX(' + -16.66 * 4 + '%)';
            }, 0);
        } else {
            idx--;
            carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
        }
        setCircles();
        // 动画结束之后开锁
        setTimeout(function () { 
            lock = true;
        },500)
    }
    // 设置小圆点的current在谁身上, 序号为idx的小圆点才有current类名，其他的li都没有类名
    function setCircles() {
        for (var i = 0; i <= 4; i++) {
            if (i === idx % 5) {
                circles_list[i].className = 'current';
            } else {
                circles_list[i].className = '';
            }
        }
    }

    // 事件委托，小圆点的监听
    circles_btn.onclick = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            var n = Number(e.target.getAttribute('data-n'));
            // 改变idx
            idx = n;
            // 拉动
            carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
            // 调用改变小圆点的函数
            setCircles();
        }
    }
    // 设置定时器，自动轮播
    var timer = setInterval(right_btn_handler, 1500);

    // 鼠标进入，自动轮播暂停
    banner.onmouseenter = function () { 
        clearInterval(timer);
    }
    // 鼠标离开，继续轮播
    banner.onmouseleave = function () { 
        // 设表先关
        clearInterval(timer);
        // 设置定时器，这里不要加var,加var变为全局变量，就清不了定时器了
        timer = setInterval(right_btn_handler, 1500);
    }
})();
