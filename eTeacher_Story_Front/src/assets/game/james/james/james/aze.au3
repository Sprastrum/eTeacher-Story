#include <File.au3>
#include <GDIPlus.au3>
Local $fNames = _FileListToArray(@ScriptDir & "\", "*.png", 1, True)
Local $max = [0, 0]

_GDIPlus_Startup()
For $i = 1 To $fNames[0]
	Local $bmp = _GDIPlus_BitmapCreateFromFile($fNames[$i])
	ConsoleWrite($fNames[$i] & @CRLF)
	If(@error) Then
		ConsoleWrite("ERR" & @CRLF)
	Else
		Local $dim = _GDIPlus_ImageGetDimension($bmp)
		If($dim[0] > $max[0] Or $dim[1] > $max[1]) Then
			$max = $dim
			ConsoleWrite("New max : " & $max[0]& ", " & $max[1] & @CRLF)
		EndIf
	EndIf
Next
ConsoleWrite("Max : " & $max[0]& ", " & $max[1] & @CRLF)

Local $row = 50
Local $col = 10
Local $bmp = _GDIPlus_BitmapCreateFromScan0($max[0] * $col, $max[1] * $row)
Local $hGraphics = _GDIPlus_ImageGetGraphicsContext($bmp)
Local $hPen = _GDIPlus_PenCreate(0xFF00FF00)

For $y = 0 To $col
	_GDIPlus_GraphicsDrawLine($hGraphics, $y * $max[0], 0, $y * $max[0], $row * $max[1], $hPen)
	_GDIPlus_GraphicsDrawLine($hGraphics, ($y+1) * $max[0] -1, 0, ($y+1) * $max[0] -1, $row * $max[1], $hPen)
Next

For $x = 0 To $row
	_GDIPlus_GraphicsDrawLine($hGraphics, 0, $x * $max[1], $col * $max[0], $x * $max[1], $hPen)
	_GDIPlus_GraphicsDrawLine($hGraphics, 0, ($x+1) * $max[1]-1, $col * $max[0], ($x+1) * $max[1]-1, $hPen)
Next

_GDIPlus_GraphicsDispose($hGraphics)
_GDIPlus_ImageSaveToFile($bmp, @ScriptDir & "\james.png")
_GDIPlus_BitmapDispose($bmp)

_GDIPlus_Shutdown()