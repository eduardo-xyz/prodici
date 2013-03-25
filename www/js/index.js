/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    catalog: {},

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', app.onDeviceReady, false);
        $(document).on('pageshow', '#demo-page', app.onDeviceReady());
        $('input:radio[name=language]').change(app.changeLanguage);
        $('#closeMenu').click(app.closeFile);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.loadConfigFile();
        console.log('App runing!');
    },
    loadConfigFile: function(){
        $.get("pdf.xml", function(data) {
            var obj = X2J.parseXml(data);
            app.catalog = obj[0].catalog;
            app.loadMagazines();
        });
    },
    changeLanguage: function(){
        if ($('input:radio[name=language]:checked').val() == 'spanish') {
            $('div.ui-radio label[for="spanish"] span.ui-btn-text').text('Español');
            $('div.ui-radio label[for="english"] span.ui-btn-text').text('Inglés');

            $('#footerMessage').text('Toque una revista para abrirla');
        } else{
            $('div.ui-radio label[for="spanish"] span.ui-btn-text').text('Spanish');
            $('div.ui-radio label[for="english"] span.ui-btn-text').text('English');

            $('#footerMessage').text('Touch a magazine to open');
        };
        $catalog.toggle( "drop", 1000, function(){
            app.loadMagazines();
            $catalog.toggle( "drop", 1000 );
        });
    },
    loadMagazines: function(){
        var magazines = [];
        $catalog = $('#catalog');
        $catalog.html('');
        if ($('input:radio[name=language]:checked').val() == 'spanish') {
            magazines = app.catalog[0].spanish[0].magazine;
        } else{
            magazines = app.catalog[0].english[0].magazine;
        };
        for (var i = magazines.length - 1; i >= 0; i--) {
            $catalog.append('<li data-content = "' + magazines[i].content[0].jValue.replace('&lt;br&gt;','<br/>') + '"><a href="#" onClick="app.loadFile(\'' + magazines[i].src[0].jValue + '\')"> <img src="' + magazines[i].img[0].jValue + '"> <h2>' + magazines[i].name[0].jValue + '</h2> <p>' + magazines[i].description[0].jValue + '</p> <p class="ui-li-aside">' + magazines[i].date[0].jValue + '</p> </a></li>');
        };
        $catalog.listview('refresh');
        $('#catalog li').unbind('taphold').bind('taphold', app.loadPopup);
    },
    loadFile: function(file){
        var ref = window.open(file, '_blank', 'location=no');
    },
    closeFile: function(){

    },
    loadPopup: function(e){
        $this = $(this);
        $('#contentPopup p').html( $this.data('content') );
        $('#contentPopup').popup( "open", { positionTo: e.target, transition: "flow" });
    }
};