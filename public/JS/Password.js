document.getElementById('password-up-form').addEventListener('input',function (){
    const password = this.value;

    const rule1 = password.length >= 5;
    const rule2 = / [!@#$%^&*(),.?":{}|<>]/.test(password);
    const rule3 = (password.match(/\d/g) || []).length>= 2;

    document.getElementById('rule-1').classList.toggle('valid', rule1);
    document.getElementById('rule-2').classList.toggle('valid', rule2);
    document.getElementById('rule-3').classList.toggle('valid', rule3);


});