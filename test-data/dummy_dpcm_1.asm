;this file for FamiTone2 library generated by text2data tool

dummy_dpcm_1_music_data:
	db 2
	dw @instruments
	dw @samples-3
	dw @song1ch0,@song1ch1,@song1ch2,@song1ch3,@song1ch4,307,256

@instruments:
	db $30 ;instrument $00
	dw @env2,@env0,@env0
	db $00
	db $30 ;instrument $01
	dw @env1,@env0,@env3
	db $00

@samples:
	db $00+<(FT_DPCM_PTR),$00,$00	;1
	db $00+<(FT_DPCM_PTR),$00,$00	;2
	db $00+<(FT_DPCM_PTR),$00,$00	;3
	db $00+<(FT_DPCM_PTR),$00,$00	;4
	db $00+<(FT_DPCM_PTR),$00,$00	;5
	db $00+<(FT_DPCM_PTR),$00,$00	;6
	db $00+<(FT_DPCM_PTR),$00,$00	;7
	db $00+<(FT_DPCM_PTR),$00,$00	;8
	db $00+<(FT_DPCM_PTR),$00,$00	;9
	db $00+<(FT_DPCM_PTR),$00,$00	;10
	db $00+<(FT_DPCM_PTR),$00,$00	;11
	db $00+<(FT_DPCM_PTR),$00,$00	;12
	db $00+<(FT_DPCM_PTR),$00,$00	;13
	db $00+<(FT_DPCM_PTR),$00,$00	;14
	db $00+<(FT_DPCM_PTR),$00,$00	;15
	db $00+<(FT_DPCM_PTR),$00,$00	;16
	db $00+<(FT_DPCM_PTR),$00,$00	;17
	db $00+<(FT_DPCM_PTR),$00,$00	;18
	db $00+<(FT_DPCM_PTR),$00,$00	;19
	db $00+<(FT_DPCM_PTR),$00,$00	;20
	db $00+<(FT_DPCM_PTR),$00,$00	;21
	db $00+<(FT_DPCM_PTR),$00,$00	;22
	db $00+<(FT_DPCM_PTR),$00,$00	;23
	db $00+<(FT_DPCM_PTR),$00,$00	;24
	db $00+<(FT_DPCM_PTR),$29,$0f	;25
	db $0b+<(FT_DPCM_PTR),$29,$0f	;26
	db $00+<(FT_DPCM_PTR),$00,$00	;27
	db $00+<(FT_DPCM_PTR),$00,$00	;28
	db $00+<(FT_DPCM_PTR),$00,$00	;29
	db $00+<(FT_DPCM_PTR),$00,$00	;30
	db $00+<(FT_DPCM_PTR),$00,$00	;31
	db $00+<(FT_DPCM_PTR),$00,$00	;32
	db $00+<(FT_DPCM_PTR),$00,$00	;33
	db $00+<(FT_DPCM_PTR),$00,$00	;34
	db $00+<(FT_DPCM_PTR),$00,$00	;35
	db $00+<(FT_DPCM_PTR),$00,$00	;36
	db $00+<(FT_DPCM_PTR),$00,$00	;37
	db $00+<(FT_DPCM_PTR),$00,$00	;38
	db $00+<(FT_DPCM_PTR),$00,$00	;39
	db $00+<(FT_DPCM_PTR),$00,$00	;40
	db $00+<(FT_DPCM_PTR),$00,$00	;41
	db $00+<(FT_DPCM_PTR),$00,$00	;42
	db $00+<(FT_DPCM_PTR),$00,$00	;43
	db $00+<(FT_DPCM_PTR),$00,$00	;44
	db $00+<(FT_DPCM_PTR),$00,$00	;45
	db $00+<(FT_DPCM_PTR),$00,$00	;46
	db $00+<(FT_DPCM_PTR),$00,$00	;47
	db $00+<(FT_DPCM_PTR),$00,$00	;48
	db $00+<(FT_DPCM_PTR),$00,$00	;49
	db $00+<(FT_DPCM_PTR),$00,$00	;50
	db $00+<(FT_DPCM_PTR),$00,$00	;51
	db $00+<(FT_DPCM_PTR),$00,$00	;52
	db $00+<(FT_DPCM_PTR),$00,$00	;53
	db $00+<(FT_DPCM_PTR),$00,$00	;54
	db $00+<(FT_DPCM_PTR),$00,$00	;55
	db $00+<(FT_DPCM_PTR),$00,$00	;56
	db $00+<(FT_DPCM_PTR),$00,$00	;57
	db $00+<(FT_DPCM_PTR),$00,$00	;58
	db $00+<(FT_DPCM_PTR),$00,$00	;59
	db $00+<(FT_DPCM_PTR),$00,$00	;60
	db $00+<(FT_DPCM_PTR),$00,$00	;61
	db $00+<(FT_DPCM_PTR),$00,$00	;62
	db $00+<(FT_DPCM_PTR),$00,$00	;63

@env0:
	db $c0,$00,$00
@env1:
	db $c3,$c6,$cc,$c9,$00,$03
@env2:
	db $c3,$c7,$ca,$cc,$00,$03
@env3:
	db $d9,$b9,$df,$d0,$00,$03


@song1ch0:
	db $fb,$06
@song1ch0loop:
@ref0:
	db $80,$36,$3a,$32,$3a,$36,$3c,$32,$36,$3a,$3c,$32,$36,$3a,$3c,$36
	db $3a,$3c,$85,$00,$d5
	db $fd
	dw @song1ch0loop

@song1ch1:
@song1ch1loop:
@ref1:
	db $85,$82,$34,$38,$34,$38,$99,$00,$d5
	db $fd
	dw @song1ch1loop

@song1ch2:
@song1ch2loop:
@ref2:
	db $83,$80,$34,$38,$34,$38,$38,$34,$38,$34,$34,$38,$8f,$00,$d5
	db $fd
	dw @song1ch2loop

@song1ch3:
@song1ch3loop:
@ref3:
	db $89,$82,$0a,$0e,$0a,$0e,$0e,$93,$00,$d5
	db $fd
	dw @song1ch3loop

@song1ch4:
@song1ch4loop:
@ref4:
	db $87,$34,$34,$34,$34,$34,$95,$00,$d5
	db $fd
	dw @song1ch4loop
