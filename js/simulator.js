$( function() {
    
    var input_change_timer;
    
    function on_input() {
        
        if ( input_change_timer )
            clearTimeout( input_change_timer );
        
        input_change_timer = setTimeout( simulate_input, 3000 );
        console.log('change');
        
    };
    
    $( '#input input' ).keyup( on_input );
    $( '#input select' ).change( on_input );
    
    function simulate_input() {
        
        console.log( 'simulate' );
        
        var errors = false;
        
        var aankoopprijs = parseFloat( $( "#aankoopprijs" ).val() );
        if ( isNaN( aankoopprijs ) ) {
            
            set_error( $( "#aankoopprijs" ) );
            errors =  true;
            
        } else
            clear_error( $( "#aankoopprijs" ) );
            
        var beschrijf = $( "#beschrijf" ).val();
        var locatie = $( "#locatie" ).val();
        var enige_woning = $( "#enige_woning" ).val();
        var huurwaarde = parseFloat( $( "#huurwaarde" ).val() );
        if ( isNaN( huurwaarde ) ) {
            
            set_error( $( "#huurwaarde" ) );
            errors = true;
            
        } else
            clear_error( $( "#huurwaarde" ) );
        var groei_woning = parseFloat( $( "#groei_woning" ).val() ) / 100;
        if ( isNaN( groei_woning ) ) {
            
            set_error( $( "#groei_woning" ) );
            errors =  true;
            
        } else
            clear_error( $( "#groei_woning" ) );
        
        var interest = parseFloat( $( "#interest" ).val() ) / 100;
        if ( isNaN( interest ) ) {
            
            set_error( $( "#interest" ) );
            errors =  true;
            
        } else
            clear_error( $( "#interest" ) );
        var looptijd = parseInt( $( "#looptijd" ).val() );
        if ( isNaN( looptijd ) ) {
            
            set_error( $( "#looptijd" ) );
            errors =  true;
            
        } else
            clear_error( $( "#looptijd" ) );
        var eigen_inbreng = parseFloat( $( "#eigen_inbreng" ).val() );
        if ( isNaN( eigen_inbreng ) ) {
            
            set_error( $( "#eigen_inbreng" ) );
            errors =  true;
            
        } else
            clear_error( $( "#eigen_inbreng" ) );
        var ssv = parseFloat( $( "#ssv" ).val() );
        if ( isNaN( ssv ) ) {
            
            set_error( $( "#ssv" ) );
            errors =  true;
            
        } else
            clear_error( $( "#ssv" ) );
        
        var inflatie = parseFloat( $( "#inflatie" ).val() ) / 100;
        if ( isNaN( inflatie ) ) {
            
            set_error( $( "#inflatie" ) );
            errors =  true;
            
        } else
            clear_error( $( "#inflatie" ) );
        var marktgroei = parseFloat( $( "#marktgroei" ).val() ) / 100;
        if ( isNaN( marktgroei ) ) {
            
            set_error( $( "#marktgroei" ) );
            errors =  true;
            
        } else
            clear_error( $( "#marktgroei" ) );
        var instapkosten = parseFloat( $( "#instapkosten" ).val() ) / 100;
        if ( isNaN( instapkosten ) ) {
            
            set_error( $( "#instapkosten" ) );
            errors =  true;
            
        } else
            clear_error( $( "#instapkosten" ) );
        var beheerskosten = parseFloat( $( "#beheerskosten" ).val() ) / 100;
        if ( isNaN( beheerskosten ) ) {
            
            set_error( $( "#beheerskosten" ) );
            errors =  true;
            
        } else
            clear_error( $( "#beheerskosten" ) );
        var gemeentetax = parseFloat( $( "#gemeentetax" ).val() ) / 100;
        if ( isNaN( gemeentetax ) ) {
            
            set_error( $( "#gemeentetax" ) );
            errors =  true;
            
        } else
            clear_error( $( "#gemeentetax" ) );
        
        var huidige_huur = parseFloat( $( "#huidige_huur" ).val() );
        var marge_simulatie = parseFloat( $( "#marge_simulatie" ).val() ) / 100;
        if ( isNaN( groei_woning ) && !isNaN( huidige_huur ) ) {
            
            set_error( $( "#marge_simulatie" ) );
            errors =  true;
            
        } else
            clear_error( $( "#marge_simulatie" ) );
        
        if ( errors )
            return;
        
        return simulate( aankoopprijs, beschrijf, locatie, enige_woning, huurwaarde, groei_woning, interest, looptijd, eigen_inbreng, ssv, inflatie, marktgroei, instapkosten, beheerskosten, gemeentetax, huidige_huur, marge_simulatie );
        
    }
    
} );



function simulate( aankoopprijs, beschrijf, locatie, enige_woning, huurwaarde, groei_woning, interest, looptijd, eigen_inbreng, ssv, inflatie, marktgroei, instapkosten, beheerskosten, gemeentetax, huidige_huur, marge_simulatie ) {
        
    var registratierecht_percentage = registratierecht_percentages[beschrijf][locatie];
    $( "#registratierecht_perc_aanschaf" ).val( registratierecht_percentage * 100 );

    var abattement = 0,
        bij_abattement = 0;
    if ( enige_woning === "true" ) {

        if ( locatie === "vlaanderen" ) {

            abattement = 15000;
            bij_abattement = 1000;

        }

        else if ( locatie === "wallonie" )
            abattement = 60000;

    }
    $( "#registratierecht_abattement_aanschaf" ).val( abattement.formatMoney() );
    $( "#registratierecht_bijabattement_aanschaf" ).val( bij_abattement.formatMoney() );

    var registratierecht = ( aankoopprijs - abattement ) * registratierecht_percentage - bij_abattement;
    $( "#registratierecht_aanschaf" ).val( registratierecht.formatMoney() );



    var ereloon_aanschaf_schijf,
        ereloon_aanschaf = 0,
        vorige_schijf_plafond = 0;
    for ( i = 0; i < erelonen_notaris_vastgoedakte.length; i++ ) {

        var schijf_plafond = erelonen_notaris_vastgoedakte[i][0],
            schijf_perc = erelonen_notaris_vastgoedakte[i][1];

        if ( aankoopprijs < schijf_plafond ) {

            ereloon_aanschaf_schijf = i + 1;
            ereloon_aanschaf += ( aankoopprijs - vorige_schijf_plafond ) * schijf_perc;
            break;

        } else {

            ereloon_aanschaf += ( schijf_plafond - vorige_schijf_plafond ) * schijf_perc;
            vorige_schijf_plafond = schijf_plafond;

        }

    }
    ereloon_aanschaf *= 1.21;

    $( "#ereloon_aanschaf" ).val( ereloon_aanschaf.formatMoney() );



    var aktekosten = 1100 * 1.21;

    $( "#aktekosten" ).val( aktekosten.formatMoney() );



    var kosten_overschrijving = 531;

    $( "#overschrijving" ).val( kosten_overschrijving.formatMoney() );



    var totale_aanschafkost = aankoopprijs + registratierecht + ereloon_aanschaf + aktekosten + kosten_overschrijving;

    $( "#aanschafkost" ).val( totale_aanschafkost.formatMoney() );





    var aanhorigheden = totale_aanschafkost * 0.1;

    $( "#aanhorigheden" ).val( aanhorigheden.formatMoney() );



    var registratierecht_lening = 0.01 * ( totale_aanschafkost + aanhorigheden );

    $( "#registratierecht_lening" ).val( registratierecht_lening.formatMoney() );



    var inschrijvingsrecht = 0.003 * ( totale_aanschafkost + aanhorigheden );

    $( "#inschrijvingsrecht" ).val( inschrijvingsrecht.formatMoney() );


    var ereloon_krediet_schijf,
        ereloon_krediet = 0,
        vorige_schijf_plafond = 0;
    for ( i = 0; i < erelonen_notaris_kredietakte.length; i++ ) {

        var schijf_plafond = erelonen_notaris_kredietakte[i][0],
            schijf_perc = erelonen_notaris_kredietakte[i][1];

        if ( totale_aanschafkost < schijf_plafond ) {

            ereloon_krediet_schijf = i + 1;
            ereloon_krediet += ( totale_aanschafkost - vorige_schijf_plafond ) * schijf_perc;
            break;

        } else {

            ereloon_krediet += ( schijf_plafond - vorige_schijf_plafond ) * schijf_perc;
            vorige_schijf_plafond = schijf_plafond;

        }

    }
    ereloon_krediet *= 1.21;

    $( "#ereloon_krediet" ).val( ereloon_krediet.formatMoney() );



    var kosten_hypotheekbewaarder = 52.4189 + 0.0043 * totale_aanschafkost;

    $( "#hypotheekbewaarder" ).val( kosten_hypotheekbewaarder.formatMoney() );



    var diversen = 1000 * 1.21;

    $( "#diversen" ).val( diversen.formatMoney() );



    var aktekosten_lening = registratierecht_lening + inschrijvingsrecht + ereloon_krediet + kosten_hypotheekbewaarder + diversen;

    $( "#aktekosten_krediet" ).val( aktekosten_lening.formatMoney() );



    var totale_kost_lening = totale_aanschafkost + aktekosten_lening + ssv;

    $( "#leningkost" ).val( totale_kost_lening.formatMoney() );

    var te_lenen =  totale_kost_lening - eigen_inbreng;

    $( "#te_lenen" ).val( te_lenen.formatMoney() );



    var afbetalingsperiodes = looptijd * 12;
    var interest_per_periode = interest / 12;

    var periodieke_afbetaling = -PMT( interest_per_periode, afbetalingsperiodes, te_lenen );

    $( "#afbetaling" ).val( periodieke_afbetaling.formatMoney() );



    var totale_interest = periodieke_afbetaling * afbetalingsperiodes - te_lenen;

    $( "#totale_interest" ).val( totale_interest.formatMoney() );



    var belastingsvoordeel = 0;

    for ( i = 0; i < looptijd; i++ ) {

        // Reeds ontvangen belastingsvoordeel beleggen aan marktgroei
        belastingsvoordeel = -FV( marktgroei / 12, 12, 0, belastingsvoordeel, 0 );

        jaarlijk_belastingsvoordeel = belastingsvoordeel_lening_basis;

        if ( i < 10 )
            jaarlijk_belastingsvoordeel += belastingsvoordeel_lening_verhoging;

        belastingsvoordeel += jaarlijk_belastingsvoordeel;

    }

    $( "#belastingsvoordeel" ).val( belastingsvoordeel.formatMoney() );
    
    
    
    var kadastraal_inkomen = huurwaarde * 0.4;
    
    $( "#kadastraal" ).val( kadastraal_inkomen.formatMoney() );
    
    var totaal_onroerende_voorheffing = -FV( marktgroei / 12, looptijd * 12, kadastraal_inkomen, 0, 1 );
    
    $( "#totaal_onroerend" ).val( totaal_onroerende_voorheffing.formatMoney() );



    var eindwaarde_woning = FV( groei_woning, looptijd, 0, -aankoopprijs, 1 );

    $( "#woningwaarde" ).val( eindwaarde_woning.formatMoney() );


    var totaal_kapitaal = eindwaarde_woning + belastingsvoordeel - totaal_onroerende_voorheffing;

    $( "#totaal_kapitaal" ).val( totaal_kapitaal.formatMoney() );




    if ( isNaN( huidige_huur ) )
        return;
    
    var start_huur = huidige_huur,
        huidige_huur_eindkapitaal,
        eindkapitaal_huur;

    do {

        eindkapitaal_huur = eigen_inbreng * ( 1 - instapkosten );

        for ( i = 0; i < looptijd; i++ ) {

            var huur_fv = start_huur * Math.pow( 1 + inflatie, i );
            var maandelijkse_storting = periodieke_afbetaling - huur_fv;

            eindkapitaal_huur = -1 * FV( marktgroei / 12, 12, maandelijkse_storting * ( 1 - instapkosten ), eindkapitaal_huur, 1 ) * ( 1 - beheerskosten );

        }

        if ( !huidige_huur_eindkapitaal )
            huidige_huur_eindkapitaal = eindkapitaal_huur;

        var afwijking = ( totaal_kapitaal - eindkapitaal_huur ) / totaal_kapitaal,
            start_huur = start_huur * ( 1 - afwijking );

    } while ( ( afwijking > marge_simulatie ) && ( start_huur > marge_simulatie ) );

    var verloren_kapitaal_huidige_huur = ( totaal_kapitaal - huidige_huur_eindkapitaal );
    var verloren_kapitaal_huidige_huur_pv = verloren_kapitaal_huidige_huur / Math.pow( 1 + inflatie, looptijd );

    $( "#eindkapitaal_huidige_huur" ).val( huidige_huur_eindkapitaal.formatMoney() );
    $( "#verloren_kapitaal_huidige_huur" ).val( verloren_kapitaal_huidige_huur_pv.formatMoney() );
    $( "#breakeven_huur" ).val( start_huur.formatMoney() );
    $( "#eindkapitaal_huur" ).val( eindkapitaal_huur.formatMoney() );

}
    
    
Number.prototype.formatMoney = function( c, d, t ) {

    var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "," : d, 
        t = t == undefined ? " " : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
   
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    
};



function PMT(ir, np, pv, fv, type) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv)/np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * pv * (pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;
}

function FV( rate, num_periods, payments, principal, type ) {
    
    var pow = Math.pow( 1 + rate, num_periods ),
        fv;
   
    if ( rate )        
        fv = ( payments * ( 1 + rate * type ) * ( 1 - pow ) / rate ) - principal * pow;
    
    else
        fv = -1 * ( principal + payments * num_periods );

    return fv;
    
}

function set_error( $input ) {
    
    $input.parent().parent().addClass( 'has-error' );
    $input.addClass( 'form-control-error' );
    
}

function clear_error( $input ) {
    
    $input.parent().parent().removeClass( 'has-error' );
    $input.removeClass( 'form-control-error' );
    
}
