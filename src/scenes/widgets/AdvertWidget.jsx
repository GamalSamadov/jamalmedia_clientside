import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
            أكاديمية حسوب
        </Typography>
        <Typography color={medium}>إعلان</Typography>
      </FlexBetween>
      <a href="https://academy.hsoub.com/learn/artificial-intelligence/">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="https://hsoub-api.onrender.com/assets/ai.png"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      </a>
      <FlexBetween>
        <Typography color={main}>دورة الذكاء الاصطناعي</Typography>
        <Typography color={medium}>
          academy.hsoub.com
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      انطلق في تعلم برمجة الذكاء الاصطناعي AI وتحليل البيانات مع هذه الدورة، التي ستتعلم فيها كل ما تحتاج إليه من الصفر دون حاجة إلى معرفة مسبقة، وتمدك بكل المعلومات لبناء نماذج ذكاء اصطناعي متخصصة.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;