# Bank React
* React Dev Tools
* Show Header app working

## Switch is not defined error
* https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
* In react-router-dom v6, "Switch" is replaced by routes "Routes". You need to update the import from

```
import { Switch, Route } from "react-router-dom";
```

* to

```
import { Routes ,Route } from 'react-router-dom';
```

* You also need to update the Route declaration from

`<Route path="/" component={Home} />`

## useHistory is not exported
* Attempted import error: 'useHistory' is not exported from 'react-router-dom'
* In react-router-dom v6 useHistory() is replaced by useNavigate()

```
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/home');
```

* history used push
* useNavigate uses:

```
const navigate = useNavigate();
navigate('/where/you/want/to/go')
```

## useEffect dependencies
```
  useEffect(() => {
    if (!userData.user) {
      navigate('/login');
    }
  }, [navigate, userData.user]);

```
