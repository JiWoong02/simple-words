interface ContentWithFooterProps {
    children: React.ReactNode;
    footer: React.ReactNode;
}

export function ContentWithFooter({
                                      children,
                                      footer,
                                  }: ContentWithFooterProps) {
    return (
        <div className="flex h-full flex-col">
            {/* 중간 스크롤 영역 */}
            <div className="flex-1 overflow-hidden">
                {children}
            </div>

            {/* 하단 고정 영역 */}
            <div className="border-t bg-background p-4">
                {footer}
            </div>
        </div>
    );
}
