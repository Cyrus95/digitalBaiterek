$(document).ready(function () {
    $('ul.navbar-nav').find('li').addClass('nav-item');
    $('ul.navbar-nav li.nav-item').find('a').addClass('nav-link');

    var title = '';
    // $("#search-product").on('keyup', function() {
    //     title = $(this).val();
    //     results(title,null);
    // });

    $("#search-category").on('keyup', function() {
        title = $(this).val();
        categoryByPattern(title);
    });

    // $("div#v-pills-tab1 a").on('click', function() {
    //     var productCategory_id = $(this).data('id');
    //     results(null,productCategory_id);
    // });
})

function showLoading(){
    $('#loader').show();
}

function hideLoading(){
    $('#loader').hide();
}

function categoryByPattern(title){

    showLoading();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        method: 'POST',
        url: baseUrl + '/categories',
        async: true,
        data: {
            "title": title
        },
        success: function (response) {
            var data = '<ul>';
            if(response.data.length == 0){
                data += '<li style="text-align: center;">No Category Found</li>';
            }
            else
            {
                $.each(response.data, function (key, value){
                    if(response.success == true){
                        data += '<li>' +
                                    '<a href="category/'+ value.id +'">' +
                                        '<div class="service-box">' +
                                            '<div class="serice-icon">' +
                                                '<i class="icon-'+ value.logo +'"></i>'+
                                            '</div>' +
                                            '<h5>' + value.title + '</h5>' +
                                            '<p>' + value.description + '</p>' +
                                            '<div class="background-icon">' +
                                                '<i class="icon-'+ value.logo +'"></i>'+
                                            '</div>' +
                                        '</div>' +
                                    '</a>' +
                                '</li>';
                    }
                });
            }

            data += '</ul>';

            $("div.categoryList").empty().html( data);
            hideLoading();
        },
        error:function (error) {
            hideLoading();
            $("#results").html('Some technical issue. Kindly wait for sometime.');
        }
    });
}

// function results(title,productCategory_id){

//     var category = '';
//     if(productCategory_id == null){
//         category = $('#v-pills-tab1').find('a.active').data('id');
//     } else {
//         category = productCategory_id;
//     }

//     showLoading();
//     $.ajaxSetup({
//         headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//         }
//     });

//     $.ajax({
//         method: 'POST',
//         url: baseUrl + '/services',
//         async: true,
//         data: {
//             "productCategory_id": category,
//             "title": title
//         },
//         success: function (response) {

//             $("div.viewResults").empty();
//             $("div.gridResults").empty();

//             var dataGrid = '<ul>';
//             var dataList = '<ul>';
//             if(response.data.length == 0){
//                 dataGrid += '<li style="text-align: center;">No Product Found</li>';
//                 dataList += '<li style="text-align: center;">No Product Found</li>';
//             }
//             else
//             {
//                 var pathname = window.location.pathname;
//                 var menuName = pathname.split('/');
//                 var mapping = '';
//                 $.each(response.data, function (key, value){

//                     if(menuName[1] == 'projects'){
//                         mapping += '<div class="hover-div"><a href="projects/'+ value.id +'" class="btn more-btn">'+ response.ViewProjectsLabel +'</a></div>';
//                     }
//                     else
//                     {
//                         mapping += '<div class="hover-div">' +
//                                         '<a href="services/'+ value.id +'" class="btn more-btn">more</a>';

//                                         if (jQuery.inArray( value.id, response.relatedProductIds ) >= 0 && value.can_apply == "Yes") {
//                                             mapping += '<a href="apply/' + value.id + '" class="btn more-btn">apply now</a>';
//                                         } else {
//                                             mapping += '<button class="btn-disabled">'+disabledBtn+'</button>';
//                                         }

//                         mapping += '</div>';

//                     }


//                     if(response.success == true){
//                         dataList += '<li><div class="list-box">' +
//                                         '<img src="storage/' + value.logo + '" class="img-fluid" alt="">' +
//                                         '<h5>' + value.title + '</h5>'
//                                         + mapping +
//                                         '</div>' +
//                                     '</li>';

//                         dataGrid += '<li><div class="grid-box">' +
//                                         '<img src="storage/' + value.logo + '" class="img-fluid" alt="">' +
//                                         '<h5>' + value.title + '</h5>'
//                                         + mapping +
//                                         '</div>' +
//                                     '</li>';
//                     }
//                 });
//             }

//             dataGrid += '</ul>';
//             dataList += '</ul>';

//             $("div.gridResults").html( dataGrid);
//             $("div.viewResults").html( dataList);

//             hideLoading();
//         },
//         error:function (error) {
//             hideLoading();
//             $("#results").html('Some technical issue. Kindly wait for sometime.');
//         }
//     });
// }