import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react"
import { Link, navigate, graphql, useStaticQuery } from "gatsby";
import { useColorMode } from "theme-ui";

import Section from "@components/Section";

import Icons from "@icons";
import mediaqueries from "@styles/media";
import {
  getWindowDimensions,
  getBreakpointFromTheme,
} from "@utils";

const siteQuery = graphql`
  {
    sitePlugin(name: { eq: "@narative/gatsby-theme-novela" }) {
      pluginOptions {
        rootPath
        basePath
      }
    }
  }
`;

const HomeButton = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${p => p.theme.colors.primary};

  &:hover,
  &:focus {
    opacity: 1;
    text-decoration: underline;
  }
`;

const DarkModeToggle: React.FC<{}> = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;

  function toggleColorMode(event) {
    event.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      data-a11y="false"
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  );
};


const NavbarCss = styled.nav`
  padding: 0 15px;

  .item {
    padding: 10px;
  }

  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    align-items: flex-end;
    flex-wrap: nowrap;
    background: none;
    list-style-type: none;
  }

  .menu li {
    z-index:9999;
  }

  .menu li a {
    display: block;
    padding: 15px 5px;
    color: ${p => p.theme.colors.articleText}
  }

  .menu .item {
    order: 1;
    position: relative;
    display: block;
    width: auto;
  }

  @media (max-width: 550px){
    display: none;
      font-size: 1.33rem;

      .menu {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
      }
      .item{
          padding: 0px;
      }
      .menu li a {
        display: block;
        padding: 5px 5px;
      }
  }

  @media (min-width: 550px) and (max-width: 735px){

    .menu {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
    }
    .item{
        padding: 0px;
    }
    .menu li a {
      display: block;
      padding: 15px 5px;
    }
  }
`;

const MobileNavCss = styled.nav`
  display: none;

  .item {
    padding:0 10px 10px 10px;
  }

  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: flex-start;
    flex-wrap: nowrap;
    background: none;
    list-style-type: none;
  }

  .menu li {
    z-index:9999;
  }

  .menu li a {
    display: block;
    padding: 15px 5px;
    color: ${p => p.theme.colors.articleText};
  }

  .menu .item {
    order: 1;
    position: relative;
    display: block;
    width: auto;
  }

  @media (max-width: 550px){
      display: block;
      font-size: 1.33rem;
      padding-top: 20px;
      width: 100%;

      .menu {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
      }
      .item{
          padding: 0px;
      }
      .menu li a {
        display: block;
        padding: 0px 10px 0px 0px;
      }
  }
`;

const NavBar = () => {
return <NavbarCss>
    <ul className="menu">
      <li className="item"><Link to="/blog">Blog</Link ></li>
      <li className="item"><Link to="/now">Now</Link ></li>
      <li className="item"><Link to="/cv">CV</Link ></li>
      <li className="item"><Link to="/projects">Projects</Link ></li>
      <li className="item"><Link to="/contact">Contact</Link >
      </li>
    </ul>
  </NavbarCss>
}

const MobileNavBar = () => {
  return <MobileNavCss>
      <ul className="menu">
        <li className="item"><Link to="/blog">Blog</Link ></li>
        <li className="item"><Link to="/now">Now</Link ></li>
        <li className="item"><Link to="/cv">CV</Link ></li>
        <li className="item"><Link to="/projects">Projects</Link ></li>
        <li className="item"><Link to="/contact">Contact</Link >
        </li>
      </ul>
    </MobileNavCss>
  }

const NavigationHeader: React.FC<{}> = () => {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
  const [previousPath, setPreviousPath] = useState<string>("/");
  const { sitePlugin } = useStaticQuery(siteQuery);

  const [colorMode] = useColorMode();
  const fill = colorMode === "dark" ? "#fff" : "#000";
  const { rootPath, basePath } = sitePlugin.pluginOptions;

  useEffect(() => {
    const { width } = getWindowDimensions();
    const phablet = getBreakpointFromTheme("phablet");

    const prev = localStorage.getItem("previousPath");
    const previousPathWasHomepage =
      prev === (rootPath || basePath) || (prev && prev.includes("/page/"));
    const currentPathIsHomepage =
      location.pathname === (rootPath || basePath) || location.pathname.includes("/page/");

    setShowBackArrow(
      previousPathWasHomepage && !currentPathIsHomepage && width <= phablet,
    );
    setPreviousPath(prev);
  }, []);

  return (
    <Section>
      <NavContainer>
        {/* <LogoLink */}
        <HomeButton
          to={rootPath || basePath}
          data-a11y="false"
          title="Navigate back to the homepage"
          aria-label="Navigate back to the homepage"
          back={showBackArrow ? "true" : "false"}
        >
          {showBackArrow && (
            <BackArrowIconContainer>
              <Icons.ChevronLeft fill={fill} />
            </BackArrowIconContainer>
          )}
          {/* <Logo fill={fill} /> */}
          {/* <HomeButton>danganiev.me</HomeButton> */}
          danganiev.me
          <Hidden>Navigate back to the homepage</Hidden>
        </HomeButton>
        <NavBar />
        <NavControls>
          {showBackArrow ? (
            <button
              onClick={() => navigate(previousPath)}
              title="Navigate back to the homepage"
              aria-label="Navigate back to the homepage"
            >
              <Icons.Ex fill={fill} />
            </button>
          ) : (
            <>
              <DarkModeToggle />
            </>
          )}
        </NavControls>
      </NavContainer>
      <MobileNavBar />
    </Section>
  );
};

export default NavigationHeader;

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaqueries.desktop_medium`
    padding-top: 50px;
  `};

  @media screen and (max-height: 800px) {
    padding-top: 50px;
  }
`;


const NavControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${mediaqueries.phablet`
    right: -5px;
  `}
`;

const IconWrapper = styled.button<{ isDark: boolean }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  &:hover {
    opacity: 1;
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 10px;


    &:hover {
      opacity: 0.5;
    }
  `}
`;

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? "4px" : "2px")} solid
    ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.primary};
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};

  &::before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${p => p.theme.colors.primary};
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.colors.primary},
      0 23px 0 ${p => p.theme.colors.primary},
      23px 0 0 ${p => p.theme.colors.primary},
      -23px 0 0 ${p => p.theme.colors.primary},
      15px 15px 0 ${p => p.theme.colors.primary},
      -15px 15px 0 ${p => p.theme.colors.primary},
      15px -15px 0 ${p => p.theme.colors.primary},
      -15px -15px 0 ${p => p.theme.colors.primary};
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${p => mediaqueries.tablet`
      transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
`;

const MoonMask = styled.div<{ isDark: boolean }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: ${p => p.theme.colors.background};
  transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: ${p => p.theme.colorModeTransition}, transform 0.45s ease;
`;

const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0px;
  height: 0px;
  visibility: hidden;
  overflow: hidden;
`;
