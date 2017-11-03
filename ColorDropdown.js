var DropButton = require("./lib/DropButton")

// from style/common.js in Tixit
var mainHeaderColor = '#01428B'
var mainBackgroundColor = '#F0F3F4'
var mainBackgroundColor2 = '#E6E6E6'
var mainFontColor = '#55606E'

registerPlugin(proto(Gem, function(superclass) {
    this.name = 'ColorDropdown'

    this.defaultOptions = function() {
        return {field:'status', states:{
            open: 'gray', inProgress:'yellow', complete: 'green'
        }}
    }
    this.requireFields = function(options) {
        var result = {}
        result[options.field] = {type:'choice', choices:['open','inProgress','complete'], initial:'open'}
        return result
    }

    // options
        // field - The name of the field to store the status in
        // states - A map of state names to colors
    this.build = function(ticket, optionsObservee, api) {
        var that = this
        var config = optionsObservee.subject
        this.field = config.field

        this.drop = DropButton(Block(), Block())
        this.add(this.drop)

        var states = this.states = Object.keys(config.states)
        this.ticket = ticket; this.config = config

        states.forEach(function(k) {
            var colorBlock = Block('color')
            var color = that.config.states[k]
            colorBlock.domNode.style.backgroundColor = color

            var item = Block('item', colorBlock,Text(k))
            item.on('click', function() {
                ticket.set(that.field, k)
                that.drop.close()
            })

            that.drop.menu.add(item)
        })

        that.updateState()
        ticket.get(that.field).on('change', function() {
            that.updateState()
        })

        // this.button.on('click', function() {
        //     var stateIndex = states.indexOf(ticket.subject.status)
        //
        //     var newStateIndex = stateIndex+1
        //     if(newStateIndex >= states.length) {
        //         newStateIndex = 0
        //     }
        //
        //     ticket.set('status', states[newStateIndex])
        // })
    }

    this.updateState = function() {
        var stateIndex = this.states.indexOf(this.ticket.get(this.field).subject)
        var color = this.config.states[this.states[stateIndex]]

        this.drop.button.domNode.style.backgroundColor = color
        this.domNode.title = this.ticket.get(this.field).subject
    }

    this.getStyle = function() {
        return {
            DropButton: {
                $button: {
                    cursor: 'pointer',
                    height: 20,width:20, borderRadius: 10,
                    margin: 5
                },
                $menu: {
                    backgroundColor: mainBackgroundColor,
                    border: '1px solid '+mainHeaderColor,
                    color: mainFontColor,
                    $item: {
                        display:'flex', alignItems: 'center',

                        backgroundColor: mainBackgroundColor2,
                        borderTop: '1px solid '+mainBackgroundColor2,
                        cursor: 'pointer',

                        $$hover: {
                            backgroundColor: 'white'
                        },

                        $color: {
                            width: 20, height: 20, borderRadius: 10,
                            margin: '2px 4px'
                        }
                    }
                }
            }
        }

    }
}))