const intlTelInputInit = ()=>{


    const b = document.createElement('script');
    b.type = 'text/javascript';
    b.src = '//code.jquery.com/jquery-latest.min.js';
    document.body.appendChild(b);




    setTimeout(()=>{
        const c = document.createElement('script');
        c.type = 'text/javascript';
        c.src = '//120.77.246.150/cdn/intlTelInput.js';
        document.body.appendChild(c);

        setTimeout(()=>{
            $("#demo").intlTelInput({
                initialCountry: "cn",
                // nationalMode: false,
            });
        },300)
    },800)

}

export {intlTelInputInit}