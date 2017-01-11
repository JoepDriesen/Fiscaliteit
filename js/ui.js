$( function() {
    
    $( '.btn-advanced-options' ).click( function() {
        
        if ( $( this ).hasClass( 'active' ) )
            $( this ).parent().parent().find( '.advanced-options' ).slideUp( 500 );
            
        else
            $( this ).parent().parent().find( '.advanced-options' ).slideDown( 500 );
                    
        $( this ).toggleClass( 'active' );
        $( this ).find( '.glyphicon' ).toggleClass( 'glyphicon-chevron-right glyphicon-chevron-down' );

        return false;
        
    } );
    
    $( '.btn-help' ).click( function() {
        
        if ( $(this).hasClass( 'active' ) )
            $( this ).parent().find( '.help-text' ).slideUp( 500 );
        
        else
            $( this ).parent().find( '.help-text' ).slideDown( 500 );
        
        $( this ).toggleClass( 'active' );
            
        return false;
        
    } );
    
} );