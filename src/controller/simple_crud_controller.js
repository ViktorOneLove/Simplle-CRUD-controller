const fs = require( 'fs' )
const path = './data/people.json';

let data = JSON.parse( fs.readFileSync(path, 'utf8') )

exports.create = function ( request, response ) {
    let person_from_req = request.url.split( '/' )[1];
    if ( person_from_req === '' ) {
        response.send( "Person name shouldn't be empty" );
    } else {
        data.people.push( person_from_req )
        fs.writeFileSync( path, JSON.stringify(person_from_req) )
        response.send( "Person with name " + person_from_req + " was added" );
    }
}

exports.read = function ( request, response ) {
    let size = Object.keys( data.people ).length;
    let output = "All people: ";

    for ( let i = 0; i < size; i++ ) {
        output += data.people[i]

        if ( i !== size - 1 ) {
            output += ", ";
        }
    }

    output += "<br />";
    response.send( output );
}

exports.update = function ( request, response ) {
    let params = request.url.split( '/' );
    let id = parseInt( params[1] );
    let new_name = params[2];
    let size = Object.keys( data.people ).length;

    if ( !Number.isSafeInteger(id) || id < 0 || id >= size ) {
        response.send( "Wrong id " + id );
    } else {
        let old_people_name = data.people[id];
        data.people[id] = new_name;
        fs.writeFileSync( path, JSON.stringify(data) );
        response.send( "Updated name for person with id " + id + "from " + old_people_name + " to " + new_name );

    }
}

exports.delete = function ( request, response ) {
    let size = Object.keys( data.people ).length;
    let id = parseInt(request.url.split( "/" )[1]);

    if ( !Number.isSafeInteger(id) || id < 0 || id >= size ) {
        response.send( "Not correct id " + id );
    } else {
        data.people.splice( id, 1 );
        fs.writeFileSync( path, JSON.stringify(data) );
        response.send( "Person with id = " + id + " was deleted." );
    }
}