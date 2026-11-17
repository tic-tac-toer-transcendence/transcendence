package game

func (o Owner) MarshalJSON() ([]byte, error) {
	switch o {
	case Cross:
		return []byte(`"X"`), nil
	case Circle:
		return []byte(`"O"`), nil
	default:
		return []byte(`null`), nil
	}
}
