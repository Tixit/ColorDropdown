`ColorDropdown`
=====


This is a [Tixit](https://tixit.me/) plugin that shows a status (or other `choice` field) as a color and lets the user pick the status via a dropdown.

![Example of ColorDropdown](ColorDropdown.png?raw=true)

For more information about Tixit plugins go here: [http://docs.tixit.me/d/Plugin_API](http://docs.tixit.me/d/Plugin_API).

#### configuration options

* ***`field`*** - The name of the `choice` field that stores the status.
* ***`states`*** - An object where each key is the string status (one of the choices of the `choice` field), and each value is the color that will be used for that status.

Example configuration: 

![ColorDropdown configuration](colorDropdown-configurationOptions.png?raw=true)

#### Required ticket schema field

This plugin requires that the ticket's schema has a `choice` field with a number of specified choices.  Here's an example based on the above configuration:

|    Name    |   Type   | List | Initial Value | Editable |             Choices            | Required |
|:----------:|:--------:|:----:|:-------------:|:--------:|:------------------------------:|:--------:|
| status     | choice   |      |               |    X     |  Open,In Progress,Complete     |          |


### License
Released under the MIT license: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
