
    function goBack() {
        if (document.referrer) {
            window.history.back(); // 如果有上一个页面
        } else {
            window.location.href = "index.html"; // 否则跳转到主页
        }
    }
    