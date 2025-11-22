import { useNavigate } from "react-router-dom";

const useScrollToSection = () => {
    const navigate = useNavigate();

    const goToSection = (id) => {
        if (window.location.pathname !== "/") {
            // Navigate to home if not already there
            navigate("/", { replace: false });

            // Delay to wait for Home to render
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            // Already on Home, just scroll
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return goToSection;
};

export default useScrollToSection;
