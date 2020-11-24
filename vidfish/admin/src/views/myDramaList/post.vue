<template>
    <div class="post">

    </div>
</template>

<script>
    export {

    }
    var settings = {
        "url": "https://api.mydramalist.com/v1/sources",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "mdl-api-key": "[client_id]"
        },
        "data": "[\n    " +
        "{\n        " +
        "" +
        "" +
        "\"xid\": \"e2dab2c22dc0bbfe759bee9bb56554aaf9a4f29b\",\n        " +
        "\"restriction\": \"US CA UA\",\n        " +
        "\"source_type\": \"free\",\n        " +
        "\"link\": \"https://mydramalist.com/24640-test-content\"\n    },\n    {\n        \"xid\": \"tesing-custom-id-29934-new-id\",\n        \"restriction\": \"AI AG AR AW BS BB BZ BM BO BQ BV BR CA KY CL CO CR CU CW DM DO EC SV FK GF GL GD GP GT GY HT HN JM MQ MX MS NI PA PY PE PR BL KN LC MF PM VC SX GS SR TT TC US UY VE VG VI\",\n        \"source_type\": \"free\",\n        \"link\": \"https://mydramalist.com/29385-test-title-22341\",\n        \"title\": {\n            \"id\": 29934\n        }\n    },\n    {\n        \"xid\": \"custom-id-29934-new-id\",\n        \"restriction\": \"AI AG AR AW BS BB BZ BM BO BQ BV BR CA KY CL CO CR CU CW DM DO EC SV FK GF GL GD GP GT GY HT HN JM MQ MX MS NI PA PY PE PR BL KN LC MF PM VC SX GS SR TT TC US UY VE VG VI\",\n        \"source_type\": \"free\",\n        \"link\": \"https://mydramalist.com/29385-test-title-22341\",\n        \"title\": {\n            \"id\": 1\n        }\n    },\n    {\n        \"xid\": \"123\",\n        \"restriction\": \"AI AG AR AW BS BB BZ BM BO BQ BV BR CA KY CL CO CR CU CW DM DO EC SV FK GF GL GD GP GT GY HT HN JM MQ MX MS NI PA PY PE PR BL KN LC MF PM VC SX GS SR TT TC US UY VE VG VI\",\n        \"source_type\": \"free\",\n        \"link\": \"https://mydramalist.com/29385-test-title-22341\",\n        \"title\": {\n            \"id\": 29385\n        }\n    }\n]",
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

</script>