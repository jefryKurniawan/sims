<!doctype html>
<html class="no-js" lang="">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>@yield('title')</title>
    <!-- Google Fonts: Inter for International School -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
    @include('layouts.Frontend.style')
</head>

<body>
    <!-- Preloader Start Here -->
    <div id="preloader"></div>
    <!-- Preloader End Here -->
    <!-- Main Body Area Start Here -->
    <div id="wrapper">
        @yield('content')
        <!-- Header Area Start Here -->
        <header>
           @include('frontend.content.header')
        </header>
        <!-- Header Area End Here -->

        <!-- Slider 1 Area Start Here -->
        <div class="slider1-area overlay-default">
            @yield('slider')
        </div>
        <!-- Slider 1 Area End Here -->
        
        <!-- About 1 Area Start Here -->
            @yield('about')
        <!-- About 1 Area End Here -->

        <!-- Video Area Start Here -->
            @yield('video')
        <!-- Video Area End Here -->

        <!-- Lecturers Area Start Here -->
            @yield('guru')
        <!-- Lecturers Area End Here -->

        <!-- News and Event Area Start Here -->
            @yield('beritaEvent')
        <!-- News and Event Area End Here -->
        
        <!-- Footer Area Start Here -->
        <footer>
            @include('frontend.content.footer')
        </footer>
        <!-- Footer Area End Here -->
    </div>
    <!-- Main Body Area End Here -->
    @include('layouts.Frontend.scripts')
</body>

</html>
