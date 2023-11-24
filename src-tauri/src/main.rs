// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![ cfg_attr( not( debug_assertions ), windows_subsystem = "windows" ) ]

#[ tauri::command( rename_all = "snake_case" ) ]
fn read_file ( path: String ) -> String
{
    return std::fs::read_to_string( path ).expect( "Should have been able to read the file" );
}

#[ tauri::command( rename_all = "snake_case" ) ]
fn write_file ( path: String, content: String )
{
    std::fs::write( path, content ).expect( "Unable to write file" );
}

fn main ()
{
    tauri::Builder::default()
        .invoke_handler( tauri::generate_handler![ read_file, write_file ] )
        .run( tauri::generate_context!() )
        .expect( "error while running tauri application" );
}
