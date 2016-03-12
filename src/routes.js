var domain = 'http://laravel-storage.app'

export default {
  allFiles: `${domain}/files/all`,
  postFile: `${domain}/files`

/*
+--------+----------+--------------+------+-------------------------------------------------+------------+
| Domain | Method   | URI          | Name | Action                                          | Middleware |
+--------+----------+--------------+------+-------------------------------------------------+------------+
|        | GET|HEAD | /            |      | Closure                                         |            |
|        | POST     | files        |      | Closure                                         |            |
|        | GET|HEAD | files/all    |      | \App\Http\Controllers\FilesController@getAll    |            |
|        | POST     | files/azure  |      | Closure                                         |            |
|        | GET|HEAD | files/{file} |      | \App\Http\Controllers\FilesController@getFile   |            |
|        | POST     | test         |      | App\Http\Controllers\FilesUploadController@test | cors       |
+--------+----------+--------------+------+-------------------------------------------------+------------+
*/

}
