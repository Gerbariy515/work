// Активация меню в мобильной версии сайта 
document.getElementById('he_bu').onclick = function () {
    document.getElementById('bo_bu').classList.toggle('active'); document.getElementById('he_me').classList.toggle('active'); document.getElementById('he_bu').classList.toggle('active'); document.getElementById('bodylook').classList.toggle('look');
}
// Активация нижнего меню сайта
document.getElementById('bo_bu').onclick = function () {
    document.getElementById('bo_bu').classList.toggle('active'); document.getElementById('he_me').classList.toggle('active'); document.getElementById('he_bu').classList.toggle('active'); document.getElementById('bodylook').classList.toggle('look');
}
// Заморозка страницы при активации меню в мобильной версии сайта
document.getElementById('con').onclick = function () {
    document.getElementById('he_me').classList.remove('active'); document.getElementById('he_bu').classList.remove('active'); document.getElementById('bodylook').classList.remove('look');
}
// Прокрутка главного десктопного меню
window.onscroll = function () {
    let fixedTop = document.getElementById('head__log');

    if (window.pageYOffset > 1) {
        fixedTop.classList.add('header__list__skroll');
    } else {
        fixedTop.classList.remove('header__list__skroll');
    }
};
// попап окно стилизация формы
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);


        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);



        if (error === 0) {
            form.classList.add('__sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('__sending');
            } else {
                alert("Ошибка");
                form.classList.remove('__sending');
            }

        } else {
            alert('Заполните обязательные поля');
        }

    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input)

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    // функция места е-маил
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // получаем инпут в переменную
    const formImage = document.getElementById('formImage');
    // получение див для превью в переменную
    const formPreview = document.getElementById('formPreview');

    // слушаем изменения в файле
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {

        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Файл прикреплён">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }


});

// ТЕСТ


// ТЕСТ