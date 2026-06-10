import * as Muicon from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';

export default function getDynamicIcon(name: string) {
    const fixIconName = () => {
        if (name.indexOf('M:') == 0) {
            return name.replace('M:', '');
        }
        return name;
    }

    //@ts-ignore
    const icon = Muicon[fixIconName()];

    if (!icon) {
        console.log("Could not find icon ", name);
        return HomeIcon;
    }
    return icon;
}