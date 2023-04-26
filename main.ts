function ReadGreyScale () {
    L1 = 0
    L2 = 0
    M = 0
    R1 = 0
    R2 = 0
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1) == 1) {
        L1 = 1
    }
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2) == 1) {
        L2 = 1
    }
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 1) {
        M = 1
    }
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1) == 1) {
        R1 = 1
    }
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2) == 1) {
        R2 = 1
    }
}
function SuivreLigne () {
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 1) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Open)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 101)
    } else {
        if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1) == 1 && maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1) == 0) {
            basic.showLeds(`
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                `)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 120)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
            maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.LeftLed, maqueenPlusV2.MyEnumSwitch.Close)
            maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.RightLed, maqueenPlusV2.MyEnumSwitch.Open)
        }
        if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1) == 0 && maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1) == 1) {
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 120)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
            maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.RightLed, maqueenPlusV2.MyEnumSwitch.Close)
            maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.LeftLed, maqueenPlusV2.MyEnumSwitch.Open)
        }
        if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1) == 0 && maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1) == 0) {
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
            maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.RightLed, maqueenPlusV2.MyEnumSwitch.Close)
            maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.LeftLed, maqueenPlusV2.MyEnumSwitch.Open)
        }
    }
}
let R2 = 0
let R1 = 0
let M = 0
let L2 = 0
let L1 = 0
maqueenPlusV2.I2CInit()
maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.AllLed, maqueenPlusV2.MyEnumSwitch.Close)
maqueenPlusV2.ledBlank()
ReadGreyScale()
basic.forever(function () {
    SuivreLigne()
})
