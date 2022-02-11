var dataPost = {
    "email": "nilson@email.com",
    "password": "nilson"
};
var url_post = 'http://localhost:8000/locations';

fetch(url_post, {
        method: 'GET', // thêm mới thì dùng post
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbHNvbkBlbWFpbC5jb20iLCJwYXNzd29yZCI6Im5pbHNvbiIsImlhdCI6MTY0NDU0NTA1MSwiZXhwIjoxNjQ0NTQ4NjUxfQ.N-8ygVWLmnS8EuQdgyorepTV67QrmKw2LypURX5RiSk'

        },
        // body: JSON.stringify(dataPost), // chuyển dữ liệu object trên thành chuỗi json
    })
    .then((response) => response.json(

    )) // chuyển kết quả trả về thành json object
    .then((data) => {

        // bạn có thể làm gì đó với kết quả cuối cùng này thì làm

        console.log('Success:', data); // ghi log kết quả hoàn thành
        localStorage.setItem('token', data.access_token);

        var htmls = data.map(function(list) {
            return `<li>
                    <h4>${list.id}</h4>
                    <h4>${list.name}</h4>
                    <button onclick = "xoaDuLieu(${list.id})" >Xoa</button>
                </li>`
        })

        document.querySelector('.tam').innerHTML = htmls.join('')

        function setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        setCookie("token", data.access_token, 365);
    })
    .catch((error) => {

        console.error('Error:', error); // ghi log nếu xảy ra lỗi
    });