package ch.makery.address.model

class Board (
	var colourList : List[Colour],
	var clueTypeList : List[Clues]
) {}

class Colour(
	var name : String,
	var shortForm : String
) {}

class Clues(
	var clueType : String
) {}